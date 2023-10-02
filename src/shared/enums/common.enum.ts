export enum ROOM_STATE {
	AVAILABLE = 'available',
	UNAVAILABLE = 'unavailable',
}

export enum ROOMING_SUBSCRIPTION_STATE {
	STAYING = 'staying',
	WANT_LEAVE = 'want_leave',
	STAYED = 'stayed',
}

export enum ROOMING_SUBSCRIPTION_REQUEST_STATE {
	WAITING_TENANT_CALL = 'wating_tenant_call',
	WAITING_TENANT_ACCEPT = 'wating_tenant_accept',
	SUCCESS = 'success',
	REJECT = 'reject',
}

export enum PAYMENT_STATE {
	EXPIRED = 'expired',
}

export enum NOTIFICATION_TYPE {
	ROOM = 'room',
	ROOMING_HOUSE = 'rooming_house',
}
