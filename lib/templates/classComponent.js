const template = (name) => `import React, { Component } from 'react';
import './styles.scss';
class ${name} extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="${name.toLowerCase()}-wrap">
                i'm ${name.toLowerCase()} page!
            </div>
        );
    }
}

export default ${name};
`;

module.exports = template;
