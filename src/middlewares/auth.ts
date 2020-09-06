import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const isValidHostname = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const valiHosts = ['diana.ec', 'localhost'];

  if (valiHosts.includes(req.hostname)) {
    next(); // si todo esta correcta pasara las siguiente ejecuccion
  } else {
    res.status(403).send({ status: 'ACCESS DENIED' });
  }

  //   console.log('req.hostname', req.hostname);
};

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  //   console.log('req.headers', req.headers);

  try {
    const { token } = req.headers;

    //si el token existe en la base
    if (token) {
      const data: any = jwt.verify(token as string, process.env.JWT_SECRET!);
      console.log('jwt data: ', data);
      // if (data.userId !== req.body.userId && data.role !== 'admin') {
      //   throw {
      //     code: 403,
      //     status: 'ACCESS_DENIED',
      //     message: 'Missing permission or invalid role',
      //   };
      // }

      //le paso sessiondata(le puedo dar cualquier nombre) un object que  contiene el campo userID == data.userid
      req.sessionData = { userId: data.userId, role: data.role }; //obtengo el userid gracias al jwt y lo guardo como un objet

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

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { role } = req.sessionData; //accedo al middlewares de isAuth con la variable sessionData
    console.log('isAdmin: ', role);

    if (role !== 'admin') {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'invalid role',
      };
    }
    next();
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message });
  }
};

export { isValidHostname, isAuth, isAdmin };
