export const validate = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(
      {
        ...req.body,
        ...req.params,
      },
      { abortEarly: false }
    );

    if (error?.details) {
      const validationError = error.details.map((element) => ({
        message: element.message,
        path: element.path[0],
      }));

      return res.status(400).json({
        statusMessage: "fail",
        errors: validationError,
      });
    } else {
      next();
    }
  };
};
