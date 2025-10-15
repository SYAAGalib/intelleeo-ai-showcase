# EmailJS Keys in Client Code

- Using EmailJS in the browser requires a PUBLIC key. This key is not a secret.
- Service ID and Template ID are identifiers, not secrets, and are routinely present in client code per EmailJS docs.
- We mirrored your other project's approach: inline initialize with `emailjs.init({ publicKey })` and call `emailjs.send(service, template, params)`.
- If you prefer env vars again later for flexibility, we can revert in one step.
