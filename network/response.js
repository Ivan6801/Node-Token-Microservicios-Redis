exports.success = (req, res, message, status) => {
    let statusCode = status || 200;
    let statusMessage = status || 'OK';
    res.status(statusCode).send({
        error: '',
        status: status,
        body: statusMessage
    });
}

exports.error = (req, res, message, status) => {
    let statusCode = status || 500;
    let statusMessage = status || 'Internal Server Error';
    res.status(statusCode).send({
        error: message,
        status: status,
        body: statusMessage
    });
}   