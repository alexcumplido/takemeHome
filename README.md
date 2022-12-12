# Take Me Home 2022

Take Me Home is a use case application for an animals rescue shelter in Barcelona. The association relied mostly on social media platforms to spread information about animals waiting to be adopted. Interest from people about the animals it was lost in the feed timeline. Therefore, this solution aims to connect people interested in adopting an animal with the shelter.

Until the database and the back-end integration can be completed this project integrates the [Petfinder JS SDK](https://github.com/petfinder-com/petfinder-js-sdk/tree/master/docs#v2-api) so a complete query and filter with animals can be emulated by the user. Currently you can visualize the [deployed project here](https://takeme-home.vercel.app/).

## Installation ⚙️

Clone this repository into a newly created directory

```shell
    # Clone repo
    $ git@github.com:alexcumplido/takemeHome.git
```

```shell
    # Install dependencies
    npm install
    yarn install
```

```shell
    # Run project
    npm run dev
    yarn dev
```

## Stack ⚒️

- HTML5
- CSS3
- JavaScript (ongoing TS migration)
- TypeScript
- React
- Vite
- Unit Testing (ongaing implementation with Vitest)

As a build tool [Vite] (https://vitejs.dev/) is used because of its fast configuration and also because creating a development environment from the ground up is allowed a minimal dependency approach.

## Components 🧬

The project followed a [Component Driven UI](https://www.componentdriven.org/) development methodology creating components from the bottom up and then combining them into complex ones.

The modal component is implemented using [React portals](https://reactjs.org/docs/portals.html). Portals let you render a children into a DOM node outside of the DOM hierarchy from its parent component.

## Visuals 👀

![Demo view](https://alexcumplido.github.io/portfolio/images/pets.PNG)

## Roadmap

- Use Sass
- Implement code quality test with codefactor and SonarQube

## Contributing 🙌

1. Fork the repo
2. Create a new branch
3. Implement changes
4. Commit and subit a pull request with a description

## Contact info 📫

Alexandre Cumplido Bou

[Linkedin](https://www.linkedin.com/in/alexandrecb/)

[Portfolio](https://alexcumplido.github.io/portfolio/)

## License 📃

[MIT License](https://opensource.org/licenses/MIT)
