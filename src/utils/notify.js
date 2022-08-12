import { Notify } from 'vant'

function MyNotify() {}
MyNotify.prototype.primary = data => Notify({ type: 'primary', message: data })
MyNotify.prototype.success = data => Notify({ type: 'success', message: data })
MyNotify.prototype.danger = data => Notify({ type: 'danger', message: data })
MyNotify.prototype.warning = data => Notify({ type: 'warning', message: data })

export default new MyNotify()
