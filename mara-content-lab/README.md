# Mara Content Lab

Editorial site for the Source-to-Authority Sprint. Next.js static export, deployed from GitHub to Cloudflare Workers static assets. Cloudflare Pages is also supported as an alternative.

Requests are reviewed manually. There is no public payment link and no automatic approval.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Hosting & publishing

The project is configured for static export in `next.config.ts` (`output: "export"`). It has no API routes or server-rendered pages. `npm run build` creates the static site in `out/`, which is published through `wrangler.jsonc`.

### 1. Push to GitHub

Create an empty public or private repository on GitHub (do not add a README or license). In a terminal, go to the repository root. For this workspace, that is the directory containing `mara-content-lab/`; if you make the project itself the repository, run the commands there and omit the `mara-content-lab/` prefix from `git add`.

If Git has not been initialized yet:

```bash
git init -b main
```

Then stage and push the project. Replace the placeholders with your GitHub details:

```bash
git add mara-content-lab
git commit -m "Publish Mara Content Lab"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

If the `origin` remote already exists, update it with `git remote set-url origin https://github.com/<YOUR_GITHUB_USERNAME>/<REPO_NAME>.git` instead of adding it again.

### 2. Current production: Cloudflare Workers Builds

The production site is a static-assets Worker at `https://mara-content-lab.mara974a.workers.dev/`, connected to this GitHub repository. A push to `main` starts a Workers Build. The repository layout and Worker configuration are:

- **Root directory:** `mara-content-lab`
- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Static assets:** `out/` (configured in `wrangler.jsonc`)

The app does not need deployment secrets or a public payment URL. Check the Workers Builds status in GitHub or the Cloudflare dashboard after pushing.

### 3. Optional alternative: Cloudflare Pages

1. Sign in to the Cloudflare dashboard.
2. Open **Workers & Pages → Create application → Pages → Connect to Git**.
3. Select your GitHub account and the repository you just pushed, and authorize access if prompted.
4. Configure the project:
   - **Production branch:** `main` (or `master` if that is your branch).
   - **Framework preset:** **None** / custom for this static export.
   - **Root directory:** `mara-content-lab` when deploying the current workspace repository as-is. Leave it blank if the project files, including `package.json`, are at the repository root.
   - **Build command:** `npm run build`.
   - **Build output directory:** `out`.
5. Save and deploy.
6. Open the generated `*.pages.dev` URL and check the site. New pushes to the production branch trigger deployments automatically; confirm builds in the Pages project’s deployments view.

### Optional: custom domain

In the Pages project, open **Custom domains** and add your domain. Follow the DNS records shown in Cloudflare’s UI (typically a CNAME, or the records Cloudflare specifies for your domain and DNS setup). Cloudflare provisions and renews SSL automatically after DNS is active. This can be done after the `pages.dev` site is working.

### Environment and payment handling

No environment variables or secrets are required for deployment. The request form submits directly to FormSubmit using its public action URL; it needs no server-side key. The Wise payment link is not stored or used by the site and is shared privately by the owner via email only after a request is reviewed and accepted. Do not add it to the repository or public site.

### Post-deployment checklist

- [ ] Open the production URL in a desktop browser and at mobile width (~375px).
- [ ] Confirm the home, `/privacy`, and `/terms` pages render and that navigation and footer links do not return 404s.
- [ ] Submit a valid request and confirm the email arrives at `mara974a@gmail.com`. The first FormSubmit submission may require one-time email activation.
- [ ] Confirm no payment link is visible anywhere on the public site.
- [ ] Check that the privacy and terms pages show the intended policies.
- [ ] Push a new commit to the production branch and confirm the configured Cloudflare build completes.

## Manual pre-launch test checklist

See [TEST.md](./TEST.md).
