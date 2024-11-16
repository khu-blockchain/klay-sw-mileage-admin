type adminInfo = {
    admin_id: string
    name: string
    wallet_address: string
    email: string
    phone_number: string
    role: number
    department: string
}

export type {
    adminInfo as getAdminInfoResponse
}