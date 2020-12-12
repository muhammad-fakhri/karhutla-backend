/** Pusat Role IDs */
const pusatRoleLevel = [4, 5]
/** Balai Role IDs */
const balaiRoleLevel = [6, 7]
/** Daops Role Ids */
const daopsRoleLevel = [8, 9]

/**
 * Check role is part of pusat role or not
 * Pusat role = admin pusat and superadmin
 * @param string id - ID of role
 */
export const isPusatRole = (id) => !!pusatRoleLevel.includes(id)

/**
 * Check role is part of balai role or not
 * Balai role = admin balai and kepala balai
 * @param string id - ID of role
 */
export const isBalaiRole = (id) => !!balaiRoleLevel.includes(id)

/**
 * Check role is part of daops role or not
 * Daops role = admin daops and kepala daops
 * @param string id - ID of role
 */
export const isDaopsRole = (id) => !!daopsRoleLevel.includes(id)
