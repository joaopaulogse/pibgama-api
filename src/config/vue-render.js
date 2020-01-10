const Vue = require("vue");
const fs = require("fs");
const renderer = require("vue-server-renderer").createRenderer({
    template: fs.readFileSync(`${__dirname}/../../views/index.template.html`, {encoding: 'utf-8'})
});

module.exports = async ( filePath, options, context ) => {
    try {

        const file = fs.readFileSync(`${__dirname}/../../views/${filePath}.html`, { encoding: 'utf-8'});
        const app = new Vue({
            ...options,
            // render: h => h(file),
            template: file
        });
        return new Promise(resolve=>{

            renderer.renderToString(app, context, (err, html)=>{
                if(err){
                    throw err;
                } else{
                    resolve(html);
                }
            });
        });

    } catch (error) {
        throw error;
    }
};
