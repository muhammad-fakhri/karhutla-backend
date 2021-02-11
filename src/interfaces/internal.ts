import {
	NonPatroliUserData,
	PatrolData,
	PatrolListData,
	UserData
} from './data'

export interface ValidatorResult {
	pass: boolean
	message: string[]
}

export interface ServiceResponse<T = any> {
	success: boolean
	message: string[]
	data?: T
}

export interface AuthValidatorResult extends ValidatorResult {
	emailError: boolean
	passwordError: boolean
}

interface PatrolCounter {
	mandiri: number
	rutin: number
	terpadu: number
}

export interface PatroliServiceResponse {
	patroliSpots: PatrolData[]
	counter: PatrolCounter
	patroliTerpadu: PatrolListData[]
	patroliMandiri: PatrolListData[]
	patroliRutin: PatrolListData[]
}

export interface LoginInput {
	email: string
	password: string
}

export interface AddPoskoInput {
	name: string
	daops: string
	kecamatan: string
}
export interface UpdatePoskoInput extends AddPoskoInput {
	id: string
}

interface BaseUserInput {
	name: string
	email: string
	registrationNumber: string
	phoneNumber: string
	password: string
	cPassword: string
}

export interface AddUserInput extends BaseUserInput {
	instantion: string
}

export interface UpdateUserInput extends BaseUserInput {
	id: string
	oldEmail: string
	oldRegistrationNumber: string
}

export type DeleteUserInput = UserData

export interface AddPatroliNonLoginUserInput {
	name: string
	role: number
}

export interface UpdatePatroliNonLoginUserInput
	extends AddPatroliNonLoginUserInput {
	id: number
}

export type DeletePatroliNonLoginUserInput = UpdatePatroliNonLoginUserInput

export interface CreateNonPatroliUser {
	id: number
	name: string
	email: string
	role: number
	organization: string
}

export type DeleteNonPatroliUser = NonPatroliUserData
