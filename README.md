# Running localy ⚛

## Basic setup

Requires [node](https://nodejs.org/en/)  
\$ `git clone https://github.com/jakic12/its-client.git` to clone the repo  
\$ `cd its-client` to go into the folder  
\$ `npm i` downloads all the required packages  
\$ `npm start` starts the development server - check console for further info

## Building for production

\$ `npm build` builds the project into the build folder

# Contributing

## Code of conduct
* Prettify your code before every commit.  
Use Prettier to prettify your code. [Vscode-prettify](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)  
Set up auto format on save - put this in settings.json
```json
"editor.formatOnSave": false,
"[javascript]": {
    "editor.formatOnSave": true
}
```
###### maybe 
* Every developer should make their own branch and communicate to the main branch via pull requests.

## File structure
* ![public](https://user-images.githubusercontent.com/37750012/67159545-4ad14600-f346-11e9-9f1c-5cbe2fec7f1c.png) **public/** everything here will be served statically
* ![folder](https://user-images.githubusercontent.com/37750012/67159545-4ad14600-f346-11e9-9f1c-5cbe2fec7f1c.png) **src/**
  + ![react](https://user-images.githubusercontent.com/37750012/67160154-2e390c00-f34e-11e9-88ea-cd6b68552f0e.png) **components/** All of the created components

  + ![redux](https://user-images.githubusercontent.com/37750012/67160212-cafba980-f34e-11e9-8b24-a10956782a3a.png) **redux/** Anything redux related
     + ![actions](https://user-images.githubusercontent.com/37750012/67160220-dbac1f80-f34e-11e9-8161-7186976b650f.png) **actions/** Redux actions 
     + ![reducers](https://user-images.githubusercontent.com/37750012/67160227-ef578600-f34e-11e9-8aff-f916c73cae4d.png) **reducers/** Redux reducers

  + ![resource](https://user-images.githubusercontent.com/37750012/67160125-fe8a0400-f34d-11e9-87f4-8230c6079814.png) **res/** Resources needed in jsx
     + ![images](https://user-images.githubusercontent.com/37750012/67160150-18c3e200-f34e-11e9-8271-e31f77b4e8a2.png) **img/** Image resources

  + ![folder](https://user-images.githubusercontent.com/37750012/67160154-2e390c00-f34e-11e9-88ea-cd6b68552f0e.png) **screens/** All of the created screens

  + ![sassFolder](https://user-images.githubusercontent.com/37750012/67160173-490b8080-f34e-11e9-80ae-914881eed749.png) **scss/** Styles
     + ![sassFolder](https://user-images.githubusercontent.com/37750012/67160173-490b8080-f34e-11e9-80ae-914881eed749.png) **components/** Styles for components
     + ![sassFolder](https://user-images.githubusercontent.com/37750012/67160173-490b8080-f34e-11e9-80ae-914881eed749.png) **screens/** Styles for screens
* <img src="https://user-images.githubusercontent.com/37750012/67159460-49ebe480-f345-11e9-8d26-0480a2fbefc2.png" height="20px" /> **.prettierrc** prettify config  
* ![npm](https://user-images.githubusercontent.com/37750012/67159516-f4640780-f345-11e9-916e-44b14d844804.png) **package.json** libraries that the project uses
