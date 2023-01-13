# Development

## Setup

### Repo and Vercel

1. Fork the repository on your Github account
2. Create an account on [vercel.com](https://vercel.com) - It is free, and we are tightly coupled with them for their api use.
3. Create a project and connect it to the forked repository
4. Set the `Root Directory` in the vercel project to empty ![image](https://i.imgur.com/8pLWN4R.png)

### Dependencies

- Python3.9
  - Admittedly i dont remember where i got this from
- [nvm](https://github.com/nvm-sh/nvm)

```
git clone https://github.com/<YOUR_ACCOUNT_NAME>/ultima.git
cd ultima
git submodule update --init
nvm install 18.12.1
nvm use 18.12.1
npm install --global pnpm
pnpm i
```

### Running

```
cd apps/balance-and-ruin
pnpm vercel
```

**NOTE:** The first time running `pnpm vercel` it will want to connect to your repo/project - Sign in using github and connect to the project you created earlier
