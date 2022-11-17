# TakemeHome 2022 | (Project in progress)

This project integrates the [Petfinder JS SDK](https://github.com/petfinder-com/petfinder-js-sdk/tree/master/docs#v2-api) allowing users to query and filter animals from a database. The main goal is to implement an agnostic architecture so integration is not limited to petfinder databases but others too. Currently you can visualize the [deployed project here](https://takeme-home.vercel.app/).

**Quality test**

Initial quality test will be developed in (Codefactor)[https://www.codefactor.io/] and [SonarQube](https://www.sonarqube.org/).

## Requirements 🎯

Soon

## Usage 📝

Soon too 🙄

## Components 🧬

The project will follow an Atomic Design driven development paired with a Component Driven UI.

[Brad Frost chapter 2](https://atomicdesign.bradfrost.com/chapter-2/)

[Brad Frost blog chapter](https://bradfrost.com/blog/post/atomic-web-design/)

[Component Driven UI](https://www.componentdriven.org/)

The modal component is implemented using [React portals](https://reactjs.org/docs/portals.html). Portals let you render a children into a DOM node outside of the DOM hierarchy from its parent component.

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
- JavaScript
- TypeScript
- React
- Vite

As a build tool I used [Vite](https://vitejs.dev/) because of its fast configuration and also because creating a development environment from the ground up is a great oportunity to realize what dependencies and scripts the project will require.

## Visuals 👀

![Demo view](./src/assets/takemeHome.gif)

## Roadmap

- Migration from JavaScript to TypeScript
- Use Sass
- Implement testing via Vitest
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

## Acknowledgements 🙏

Soon 🙄

## License 📃

[MIT License](https://opensource.org/licenses/MIT)
