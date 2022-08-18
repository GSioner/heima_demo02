import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export default dayjs
