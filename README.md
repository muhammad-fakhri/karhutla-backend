# SIPP Karhutla (Sistem Informasi Patroli Pencegahan Kebakaran Hutan dan Lahan)

## Description

This project is the frontend module of the SIPP Karhutla, a joint project between Ministry of Environment and Forestry of The Republic of Indonesia and Computer Science Department of IPB University.

## Development Tools

-   [Next.js by Vercel](https://nextjs.org)
-   [Material UI](https://material-ui.com)
-   [Material UI Kit](https://www.creative-tim.com/product/nextjs-material-kit)
-   [axios](https://github.com/axios/axios)
-   [js-cookie](https://github.com/js-cookie/js-cookie)
-   [Moment.js](https://momentjs.com)
-   [webpack](https://webpack.js.org)

## Set Up

1. Clone this repo and change directory to project folder  
   `git clone https://github.com/muhammad-fakhri/sipp-karhutla.git && cd /sipp-karhutla`
2. Install dependencies  
   `yarn install`
3. Continue to [Dev Guide](#run-dev-server) or [Production Guide](#prepare-for-production)

## Run Dev Server

1. Use below command in the terminal  
   `yarn dev`
2. Access development server in  
   `http://localhost:3000`

## Prepare for Production

1. Copy `.env` to `.env.local` and set API Server IP env value
2. Run this code to start production server  
   `pm2 startOrReload ecosystem.config.js`
3. Production server will listening at  
   `http://localhost:3000`

## Static HTML Export

1. Build project and export html  
   `yarn prod:export`
2. Command above will build the project and export html static. The exported html files will be placed inside `/out` folder
3. Deploy project files inside `/out` folder to the server

## Developer Team

-   Muhammad Fakhri ([@muhammad-fakhri](https://github.com/muhammad-fakhri))
