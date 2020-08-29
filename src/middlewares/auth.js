const jwt = require('jsonwebtoken');

const isValidHostname = (req, res, next) => {
  const valiHosts = ['diana.ec', 'localhost'];

  if (valiHosts.includes(req.hostname)) {
    next(); // si todo esta correcta pasara las siguiente ejecuccion
  } else {
    res.status(403).send({ status: 'ACCESS DENIED' });
  }

  //   console.log('req.hostname', req.hostname);
};

const isAuth = (req, res, next) => {
  //   console.log('req.headers', req.headers);

  try {
    const { token } = req.headers;

    //si el token existe en la base
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      console.log('jwt data: ', data);
      // if (data.userId !== req.body.userId && data.role !== 'admin') {
      //   throw {
      //     code: 403,
      //     status: 'ACCESS_DENIED',
      //     message: 'Missing permission or invalid role',
      //   };
      // }

      //le paso sessiondata(le puedo dar cualquier nombre) un object que  contiene el campo userID == data.userid
      req.sessionData = { userId: data.userId }; //obtengo el userid gracias al jwt y lo guardo como un objet

      next();
    } else {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Missing header token',
      };
    }
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message });
  }

  //   const valiHosts = ['diana.ec', 'localhost'];
  //   if (valiHosts.includes(req.hostname)) {
  //     next(); // si todo esta correcta pasara las siguiente ejecuccion
  //   } else {
  //     res.status(403).send({ status: 'ACCESS DENIED' });
  //   }
  //   console.log('req.hostname', req.hostname);
};

module.exports = {
  isValidHostname,
  isAuth,
};
