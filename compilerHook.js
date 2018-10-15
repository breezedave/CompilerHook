function CompilerHook(jobs) {
    this.jobs = jobs;
}

CompilerHook.prototype.apply = function(compiler) {
    let jobs = this.jobs;
    compiler.hooks.compile.tap("Compiler Hook", () => {
        const fs = require("fs");
        for(let i in jobs) {
            fs.writeFileSync(`./${i}.js`, `let ${i} = 1;`);
        }
    });
};

module.exports = CompilerHook;
