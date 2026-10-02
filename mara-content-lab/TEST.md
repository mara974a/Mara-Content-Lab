# Manual test checklist

Do not automate these checks. Confirm each item by hand before launch.

- [ ] Submit the form with valid data and confirm the email arrives at mara974a@gmail.com.
- [ ] Submit the form with invalid data (missing required fields) and confirm errors show and submission is blocked.
- [ ] Test the form and key pages at mobile width (~375px), tablet (~768px), and desktop.
- [ ] Test keyboard navigation: tab through form fields, buttons, and links; ensure focus is visible.
- [ ] Confirm `/privacy` and `/terms` pages render correctly and have no broken internal links.
- [ ] Confirm no payment link is visible anywhere on the public site.

Notes:

- The first FormSubmit delivery may require one-time email activation for mara974a@gmail.com.
- A successful on-site message means the request was accepted by the form endpoint. It does not guarantee inbox delivery until the email is confirmed.
- After review, send the Wise payment link only for accepted requests. Do not add it to the website.
