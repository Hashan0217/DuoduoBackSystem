class webSocket {
	constructor(time = 60) {
		this.url = 'ws://localhost:8001/api/ws'
		this.data = null
		this.isCreate = false // WebSocket 是否创建成功
		this.isConnect = false // 是否已经连接
		this.isInitiative = false // 是否主动断开
		this.timeoutNumber = time // 心跳检测间隔
		this.heartbeatTimer = null // 心跳检测定时器
		this.reconnectTimer = null // 断线重连定时器
		this.socketExamples = null // websocket实例
		this.againTime = 3 // 重连等待时间(单位秒)
	}
	//初始化
	initSocket() {
		const _this = this
		this.socketExamples = uni.connectSocket({
			url: _this.url,
			header: {
				'content-type': 'application/json'
			},
			success: (res) => {
				_this.isCreate = true
				console.log(res)
			},
			fail: (rej) => {
				_this.isCreate = false
				console.error(rej)
			}
		})
		//调用创建Socket连接的函数
		this.createSocket()


	}
	//创建Socket连接
	createSocket() {
		if (this.isCreate) {
			console.log('webSocket开始初始化')

			try {

				this.socketExamples.onOpen(() => {
					console.log('WebSocket 连接成功')
					this.isConnect = true
					//清除定时器
					clearInterval(this.heartbeatTimer)
					clearTimeout(this.reconnectTimer)
					//打开心跳检测
					this.heartbeatCheck()
				})

				// 监听 WebSocket 接受到服务器的消息事件
				this.socketExamples.onMessage((res) => {
					// console.log('接收webSocket消息', res);
					let msg = res.data
					uni.$emit('socket-message', msg);
					// if (msg.includes('42["/topic/message"')) {
					// 	// 此处对接收的消息进行处理，然后发射全局事件(socket-message)

					// }

				})

				// 监听 WebSocket 连接关闭事件
				this.socketExamples.onClose(() => {
					console.log('WebSocket 关闭了');
					this.isConnect = false
					this.reconnect()
				})
				// 监听 WebSocket 错误事件
				this.socketExamples.onError((res) => {
					console.log('WebSocket 出错了');
					console.log(res);
					this.isInitiative = false
				})


			} catch (error) {
				console.warn(error)
			}
		} else {
			console.warn('WebSocket 初始化失败!')
		}
	}

	//发送消息
	sendMsg(value) {
		const param = JSON.stringify(value)
		return new Promise((resolve, reject) => {
			this.socketExamples.send({
				data: param,
				success() {
					// console.log('消息发送成功');
					resolve(true)
				},
				fail(error) {
					// console.log('消息发送失败')
					reject(error)
				}
			})
		})
	}

	//开启心跳检测
	heartbeatCheck() {
		console.log('开启心跳');
		this.data = {
			state: 1,
			method: 'heartbeat'
		}
		this.heartbeatTimer = setInterval(() => {
			this.sendMsg(this.data)
		}, this.timeoutNumber * 1000)
	}
	// 重新连接
	reconnect() {
		// 停止发送心跳
		clearTimeout(this.reconnectTimer)
		clearInterval(this.heartbeatTimer)
		if (!this.isInitiative) {
			this.reconnectTimer = setTimeout(() => {
				this.initSocket()
			}, this.againTime * 1000)
		}
	}

	// 关闭 WebSocket 连接
	closeSocket(reason = '关闭') {
		const _this = this
		this.socketExamples.close({
			reason,
			success() {
				_this.data = null
				_this.isCreate = false
				_this.isConnect = false
				_this.isInitiative = true
				_this.socketExamples = null
				clearInterval(_this.heartbeatTimer)
				clearTimeout(_this.reconnectTimer)
				console.log('关闭 WebSocket 成功')
			},
			fail() {
				console.log('关闭 WebSocket 失败')
			}
		})
	}


}


export default webSocket