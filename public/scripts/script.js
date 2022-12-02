const registerForm = document.querySelector("form[action='/users/register']");
const loginForm = document.querySelector("form[action='/users/login']");
const updateForm = document.querySelector(
    "form[action^='/users/id'][method='put']"
); //  form[action^='/users/id'] = form whose action string start with "/users/id"
const errorContainer = document.querySelector("main > hgroup > h3.error");

const checkAvailable = async (variable, property, message) => {
    if (variable.length) {
        const canAdd = await (
            await fetch(`/users/register/check/${property}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [property]: variable }), //  { [property]: value } will replace the key with the actual name of the prop
            })
        ).json();

        if (canAdd.exists) return message;
        return "";
    }
};

//  object?.propertyOrMethod will only access propertyOrMethod if it exists
registerForm?.addEventListener("input", async (e) => {
    e.preventDefault();
    const name = registerForm.querySelector("#name").value;
    const email = registerForm.querySelector("#email").value;

    errorContainer.innerText = [
        await checkAvailable(
            name,
            "name",
            "A user with that name already exists"
        ),
        await checkAvailable(
            email,
            "email",
            "That email address has already been registered"
        ),
    ]
        .filter((x) => !!x) //  Filters out the missing values
        .join("; ");
});

registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (errorContainer.innerText.trim().length === 0) {
        const canAdd = await (
            await fetch("/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: registerForm.name.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                }),
            })
        ).json();

        if (canAdd.exists) {
            errorContainer.innerText =
                "That name / email has already been registered";
        } else {
            window.location = "/";
        }
    }
});

updateForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = await (
        await fetch(e.target.action, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: updateForm.name.value,
                email: updateForm.email.value,
            }),
        })
    ).json();

    errorContainer.innerText = user.message;
});

loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = await (
        await fetch(e.target.action, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                password: loginForm.password.value,
                email: loginForm.email.value,
            }),
        })
    ).json();

    errorContainer.innerText = user.message;

    if (user.ok)
        setTimeout(() => {
            window.location = "/";
        }, 1000);
});
