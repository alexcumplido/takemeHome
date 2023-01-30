# Take Me Home

Take Me Home is a use case application for people looking to adopt an animal from a local rescue shelter. The association relied mostly on social media platforms to spread information about animals waiting to be adopted. Interest from people about the animals it was lost in the feed timeline. Therefore, this solution aims to connect people interested in adopting them with the shelter.

This project is consuming the [Petfinder JS SDK](https://github.com/petfinder-com/petfinder-js-sdk/tree/master/docs#v2-api) so a complete query and filter with real animals can be performed by the user itself. Currently you can visualize the [deployed project here](https://takeme-home.vercel.app/).

## Installation

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

## Stack

- HTML5, CSS3
- JavaScript (ongoing TS migration)
- TypeScript
- React
- Vite

## Components 🧬

The project followed a [Component Driven UI](https://www.componentdriven.org/) development methodology creating components from the bottom up and then combining them into complex ones.

The modal component is implemented using [React portals](https://reactjs.org/docs/portals.html). Portals let you render a children into a DOM node outside of the DOM hierarchy from its parent component.

## Visuals

![Demo view](https://alexcumplido.github.io/portfolio/images/pets.PNG)

## Roadmap

- Use Sass
- Implement code quality test with codefactor and SonarQube
- Implement Unit Testing with Vitest

## Contributing

1. Fork the repo
2. Create a new branch
3. Implement changes
4. Commit and subit a pull request with a description

## Contact info 📫

alexcubou@gmail.com

[Linkedin](https://www.linkedin.com/in/alexandrecb/)

## License 📃

[MIT License](https://opensource.org/licenses/MIT)
