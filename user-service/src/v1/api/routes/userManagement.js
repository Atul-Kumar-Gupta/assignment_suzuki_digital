import constant from "../../../constant";
import serviceResponse from "../../../utils/serviceResponse";
import { addUser, editUser, listUser } from "../controller/userManagement";

const routes = (app) => {

    app.post('/v1/user-management', (req, res) => {
        addUser(req.body).then((result) => {
            res.send(serviceResponse({
                result, status: constant.apiStatus.success,
                allowed: true,
            }))
        }).catch((error) => {
            res.send(serviceResponse({ error, status: constant.apiStatus.failed, allowed: false }))
        })
    })

    
    app.put('/v1/user-management', (req, res) => {
        editUser(req.body).then((result) => {
            res.send(serviceResponse({
                result, status: constant.apiStatus.success,
                allowed: true,
            }))
        }).catch((error) => {
            res.send(serviceResponse({ error, status: constant.apiStatus.failed, allowed: false }))
        })
    })

     app.get('/v1/user-management', (req, res) => {
        listUser(req.body).then((result) => {
            res.send(serviceResponse({
                result, status: constant.apiStatus.success,
                allowed: true,
            }))
        }).catch((error) => {
            res.send(serviceResponse({ error, status: constant.apiStatus.failed, allowed: false }))
        })
    })

}
export default routes;