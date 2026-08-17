export default function errorHandler(err, req, res, _next) {
  const { statusCode = 500, message } = err;

  if (err.name === "ValidationError") {
    return res.status(400).send({ message: "Validation failed" });
  }

  if (err.code === 11000) {
    return res.status(409).send({ message: "User with this email already exists" });
  }

  if (statusCode === 401) {
    return res.status(401).send({ message: message || "Authorization required" });
  }

  console.error(err);
  return res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
}
