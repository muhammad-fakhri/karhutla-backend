import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, Icon } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import styles from '../../assets/jss/nextjs-material-kit/components/headerLinksStyle'
import CustomDropdown from '../CustomDropdown/CustomDropdown'
import Button from '../CustomButtons/Button'
import useAuth from '../../context/auth'

const useStyles = makeStyles(styles)

const AuthenticatedMenu = (props) => {
	const classes = useStyles()

	return (
		<List className={classes.list}>
			<ListItem className={classes.listItem}>
				<Link href="/dashboard">
					<Button color="transparent" className={classes.navLink}>
						Dashboard
					</Button>
				</Link>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Link href="/pelaporan">
					<Button color="transparent" className={classes.navLink}>
						Pelaporan
					</Button>
				</Link>
			</ListItem>
			<ListItem className={classes.listItem}>
				<CustomDropdown
					noLiPadding
					navDropdown
					buttonText="Manajemen Pengguna"
					buttonProps={{
						className: classes.navLink,
						color: 'transparent'
					}}
					dropdownList={[
						<Link href="/pengguna" key="data">
							<a className={classes.dropdownLink}>
								Data Pengguna
							</a>
						</Link>,
						<Link href="/pengguna/hak-akses" key="access">
							<a className={classes.dropdownLink}>Hak Akses</a>
						</Link>,
						<Link href="/penugasan" key="task">
							<a className={classes.dropdownLink}>Penugasan</a>
						</Link>
					]}
				/>
			</ListItem>
			<ListItem className={classes.listItem}>
				<CustomDropdown
					noLiPadding
					navDropdown
					buttonText="Wilayah Kerja"
					buttonProps={{
						className: classes.navLink,
						color: 'transparent'
					}}
					dropdownList={[
						<Link href="/wilayah" key="region">
							<a className={classes.dropdownLink}>Wilayah</a>
						</Link>,
						<Link href="/wilayah/balai" key="balai">
							<a className={classes.dropdownLink}>Balai</a>
						</Link>,
						<Link href="/wilayah/daops" key="daops">
							<a className={classes.dropdownLink}>
								Daerah Operasi
							</a>
						</Link>,
						<Link href="/wilayah/posko" key="posko">
							<a className={classes.dropdownLink}>Posko</a>
						</Link>
					]}
				/>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Link href="/hotspot">
					<Button color="transparent" className={classes.navLink}>
						Hotspot
					</Button>
				</Link>
			</ListItem>
			<ListItem className={classes.listItem}>
				<CustomDropdown
					noLiPadding
					navDropdown
					buttonText="Akun"
					buttonProps={{
						className: classes.navLink,
						color: 'transparent'
					}}
					dropdownList={[
						<Link href="/profile" key="profile">
							<a className={classes.dropdownLink}>Profil</a>
						</Link>,
						<a
							className={classes.dropdownLink}
							onClick={props.logout}
							key="logout"
						>
							Logout
						</a>
					]}
				/>
			</ListItem>
		</List>
	)
}

const UnauthenticatedMenu = () => {
	const classes = useStyles()

	return (
		<List className={classes.list}>
			<ListItem className={classes.listItem}>
				<Link href="/login">
					<Button color="transparent" className={classes.navLink}>
						<Icon className={classes.icons}>login</Icon> Login
					</Button>
				</Link>
			</ListItem>
		</List>
	)
}

export default function HeaderLinks() {
	const { isAuthenticated, logout } = useAuth()

	return isAuthenticated ? (
		<AuthenticatedMenu logout={logout} />
	) : (
		<UnauthenticatedMenu />
	)
}
