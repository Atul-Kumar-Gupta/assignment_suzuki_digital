import constant from "../../../constant"
import { execute, executeOne, find, insert, insertMany, remove, update } from "../../../utils/dbHelper"
import error from "../../../utils/error"
const { table } = constant

export const addUser = async (body) => {
    try {
        const user = await executeOne(`select * from ${table.assignment_user} where EMAIL = '${body.email}' or MOBILE = '${body.mobile}'`)
        if (!user) {
            const model = {
                NAME: body.user,
                AGE: body.age,
                MOBILE: body.mobile,
                EMAIL: body.email,
            }
            const result = await insert(table.assignment_user, model)
            const interestModel = body.interestArray.map((interest) => {
                return {
                    USER_ID: result[0],
                    INTEREST: interest
                }
            })
            await insertMany(table.user_interests, interestModel)
            return {
                message: 'User Added Successfully'
            }
        }
        else {
            throw new Error(error.userExists)

        }
    }
    catch (error) {
        throw error
    }
}



export const editUser = async (body) => {
    try {
        const user = await executeOne(`select * from ${table.assignment_user} where USER_ID = '${body.id}'`)
        if (user) {
            const model = {
                NAME: body.user,
                AGE: body.age,
                MOBILE: body.mobile,
                EMAIL: body.email,
            }
            const result = await update(table.assignment_user, { USER_ID: body.id }, model)
            const interestModel = body.interestArray.map((interest) => {
                return {
                    USER_ID: body.id,
                    INTEREST: interest
                }
            })
            await remove(`delete from ${table.user_interests} where USER_ID = '${body.id}'`)
            await insertMany(table.user_interests, interestModel)
            return {
                message: 'User Updated Successfully'
            }
        }
        else {
            throw new Error(error.userNotFound)

        }
    }
    catch (error) {
        throw error
    }
}

export const listUser = async () => {
    try {
        const query = `SELECT USER_ID, NAME AS user,AGE AS age, MOBILE AS mobile, EMAIL AS email FROM ${table.assignment_user} ORDER BY USER_ID ASC`;
        let result = await execute(query);
        result = await Promise.all((result.map(async (item) => {
            item.interest = await execute(`select INTEREST from ${table.user_interests} where USER_ID = ${item.USER_ID}`)
            return item
        })))
        return {
            success: true,
            data: result,
            message: 'Users fetched successfully'
        };
    } catch (error) {
        console.error('Error in listUser:', error);
        return {
            success: false,
            data: [],
            message: 'Error fetching users',
            error: error.message
        };
    }
};


