import CONFIG from '../config.js';
import constant from '../constant.js';

import { Sequelize, QueryTypes } from 'sequelize';


export const sequelize = new Sequelize(constant.database.name, CONFIG.dbConnection.user, CONFIG.dbConnection.password, {
  host: CONFIG.dbConnection.host,
  dialect: 'mysql',
  operatorsAliases: 0,
  logging: false,
  charset: 'utf8mb4', 

});


export const execute = async (query) => {
  try {
    await sequelize.authenticate();
    console.log(query)
    const rows = await sequelize.query(query, { type: "SELECT" });
    return Promise.resolve(rows)
  } catch (error) {
    return Promise.reject(error);
  }
}

export const remove = async (query) => {
  try {
    await sequelize.authenticate();
    const rows = await sequelize.query(query, { type: QueryTypes.DELETE });
    return Promise.resolve(1)
  } catch (error) {
    return Promise.reject(error);
  }
}

export const executeOne = async (query) => {
  try {
    await sequelize.authenticate();
    const rows = await sequelize.query(query, { type: QueryTypes.SELECT });
    return Promise.resolve(rows.length > 0 ? rows[0] : null)
  } catch (error) {
    return Promise.reject(error);
  }
}

export const executeInsert = async (query) => {
  try {
    await sequelize.authenticate();

    const rows = await sequelize.query(query, { type: QueryTypes.INSERT });
    return Promise.resolve(rows.length > 0 ? rows[0] : null)
  } catch (error) {
    return Promise.reject(error);
  }
}

export const updateOne = async (query) => {
  try {
    await sequelize.authenticate();

    const rows = await sequelize.query(query, { type: QueryTypes.UPDATE });
    return Promise.resolve(rows.length > 0 ? rows[0] : null)
  } catch (error) {
    return Promise.reject(error);
  }
}



export const findOne = async (tableName, query) => {
    try {
      await sequelize.authenticate();
  
      let cond = [];
      for (let [key, value] of Object.entries(query)) {
        cond.push(`${tableName}.${key} = '${value}'`);
      }
  
      const q = `SELECT * FROM ${constant.database.name}.${tableName} WHERE ${cond.join(' AND ')}`;
      const rows = await sequelize.query(q, { type: QueryTypes.SELECT });
      
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  };



export const findById = async (tableName, query, returnType) => {
  try {
    await sequelize.authenticate();

    let cond = [];
    for (let [key, value] of Object.entries(query)) {
      cond.push(`${tableName}.${key} = '${value}'`)
    }
    const q = `SELECT * FROM ${constant.database.name}.${tableName} WHERE ${cond.join()}`

    const rows = await sequelize.query(q, { type: QueryTypes.SELECT });

    return Promise.resolve(rows.length > 0 ? (returnType == 'Array' ? rows : rows[0]) : (returnType == 'Array' ? rows : null))
  } catch (error) {
    return Promise.reject(error);
  }
}



export const find = async (tableName) => {
  try {
    await sequelize.authenticate();

    const query = `SELECT * FROM "${tableName}" `

    const rows = await sequelize.query(query, { type: QueryTypes.SELECT });
    return Promise.resolve(rows)
  } catch (error) {
    // pool.end();
    return Promise.reject(error);
  }
}


export const insert = async (tableName, param) => {
  try {

    await sequelize.authenticate();

    let paramKeys = Object.keys(param);
    const query = `
      INSERT INTO ${constant.database.name}.${tableName}
      (${paramKeys.join(', ')}) 
      VALUES
      ( ${paramKeys.map((i, ind) => `"${param[i]}"`).join(', ')} )
      `;

    const rows = await sequelize.query(query, { type: QueryTypes.INSERT });

    return Promise.resolve(rows);
  } catch (error) {
    return Promise.reject(error)
  }
}


export const insertMany = async (tableName, param) => {
  try {
    await sequelize.authenticate();

    let itemKeys = Object.keys(param[0])
    let query = "INSERT INTO " + constant.database.name + '.' + tableName + " (" + itemKeys.join(',') + ") VALUES ";//( '" + itemValues.join("', '") + "' ) ";
    for (let obj of param) {
      let itemValues = []
      itemKeys.forEach(function (item) {
        let val = obj[item]
        if (val) {
          val = val.toString()
          val = val.replace(/'/g, "''")
        }

        itemValues.push(val);
      });
      query += " (\'" + itemValues.join('\',\'') + "\'),"
    }
    query = query.slice(0, -1)
    const rows =  await sequelize.query(query, { type: QueryTypes.INSERT });

    return Promise.resolve(rows);
  } catch (error) {
    return Promise.reject(error);
  }
}



export const update = async (tableName, queryParam, updateParam) => {
  try {
    await sequelize.authenticate();

    let queryKeys = Object.keys(queryParam);
    let updateKeys = Object.keys(updateParam);

    let tableToUpdate = [];
    let colTOUpdate = [];
    let colToQuery = [];
    tableToUpdate.push(`UPDATE ${tableName} SET`);

    updateKeys.forEach((item, index) => {
      const value = updateParam[item];
      const isNull = value === null || value === undefined || value.length === 0;
      const isString = typeof value === 'string';
      const q = `${item}=${isNull ? null : `'${isString ? value.replace(/'/g, '') : value}'`}`;
      colTOUpdate.push(q);
    });

    queryKeys.forEach((item, index) => {
      const isNull = item === null;
      const q = `${item}=${isNull ? null : `'${queryParam[item]}'`}`;
      colToQuery.push(q);
    });
    const query = tableToUpdate.concat(colTOUpdate.join(', '), "where", colToQuery.join(' and ')).join(' ');

    const rows = await sequelize.query(query, { type: QueryTypes.UPDATE });
    return Promise.resolve(rows);
  } catch (error) {
    return Promise.reject(error)
  }
}





