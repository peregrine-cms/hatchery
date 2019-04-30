class Model {

    async use() {
        console.log(this.title)
        return { test: 'hello' };
    }

}

module.exports = Model