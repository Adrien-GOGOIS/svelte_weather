## Sign up to weather app and get an API key

Go to [Weather API](https://www.weatherapi.com/) free API, sign up and get an API key.
In the project root directory, create a file "/.env" and enter your key :

```bash
# Private
SECRET_API_KEY="<YOUR_API_KEY>"

# Public
PUBLIC_API_KEY="<YOUR_API_KEY>"
```

## Run project

Once you've installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of this app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
