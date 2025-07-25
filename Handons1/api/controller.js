exports.calculate = function(req, res) {
  req.app.use(function(err, _req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    res.status(400);
    res.json({ error: err.message });
  });

  // Support both GET (query parameters) and POST (request body)
  const params = req.method === 'POST' ? req.body : req.query;

  if (!params.operation) {
    throw new Error("Unspecified operation");
  }

  if (!params.operand1 ||
      !params.operand1.toString().match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      params.operand1.toString().replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid operand1: " + params.operand1);
  }

  if (!params.operand2 ||
      !params.operand2.toString().match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      params.operand2.toString().replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid operand2: " + params.operand2);
  }

    // TODO: Add operator
    var operations = {
      'add':      function(a, b) { return Number(a) + Number(b) },
      'subtract': function(a, b) { return Number(a) - Number(b) },
      'multiply': function(a, b) { return Number(a) * Number(b) },
      'divide':   function(a, b) { 
        if (Number(b) === 0) {
          throw new Error("Division by zero is not allowed");
        }
        return Number(a) / Number(b); 
      }
    };

    var operation = operations[params.operation];
    if (!operation) {
      throw new Error("Invalid operation: " + params.operation);
    }

  res.json({ result: operation(params.operand1, params.operand2) });
};


