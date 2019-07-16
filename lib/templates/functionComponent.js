const template = (name) => `import React from 'react';
import './styles.scss';
const ${name} = () => {
    return (
        <div className="${name.toLowerCase()}-wrap">
            i'm ${name.toLowerCase()} page!
        </div>
    );
};

export default ${name};
`;

module.exports = template;
