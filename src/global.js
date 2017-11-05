export default {
    history: null,
    handleError: (err, res) => {
        if (err) {
            console.error(res);

            alert(res.body.message + " - " + res.body.documentation_url);
            throw err;
        }
    }
};