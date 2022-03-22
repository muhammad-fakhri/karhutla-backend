import { Icon, List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import styles from '../../assets/jss/nextjs-material-kit/components/headerLinksStyle'
import useAuth from '../../context/auth'
import Button from '../CustomButtons/Button'
import CustomDropdown from '../CustomDropdown/CustomDropdown'
import ReactDOMServer from 'react-dom/server'
import React from 'react'

const useStyles = makeStyles(styles)

const AuthenticatedMenu = (props) => {
	const classes = useStyles()
	const { isAuthenticated, user } = useAuth()
	const data_pengguna_menu = [0, 1, 2]
	const hak_akses_menu = [0, 1, 2]
	const penugasan_menu = [0, 1, 2, 3, 4, 5, 6, 7]
	const wilayah_menu = [0, 1, 2, 3, 4, 5, 6, 7]
	let pengguna_html = <></>
	let akses_html = <></>
	let penugasan_html = <></>
	let wilayah_html = <></>

	if (data_pengguna_menu.includes(user.roleLevel)) {
		pengguna_html = (
			<Link href="/pengguna" key="data">
				<a className={classes.dropdownLink}>Data Pengguna</a>
			</Link>
		)
	}

	if (hak_akses_menu.includes(user.roleLevel)) {
		akses_html = (
			<Link href="/pengguna/hak-akses" key="access">
				<a className={classes.dropdownLink}>Hak Akses</a>
			</Link>
		)
	}

	if (penugasan_menu.includes(user.roleLevel)) {
		penugasan_html = (
			<Link href="/penugasan" key="task">
				<a className={classes.dropdownLink}>Penugasan</a>
			</Link>
		)
	}

	if (wilayah_menu.includes(user.roleLevel)) {
		wilayah_html = (
			<Link href="/wilayah" key="task">
				<a className={classes.dropdownLink}>Wilayah Kerja</a>
			</Link>
		)
	}

	// console.log(user.roleLevel)
	// console.log(data_pengguna.includes(9))
	return (
		<List className={classes.list}>
			<ListItem className={classes.listItem}>
				<Link href="/">
					<Button color="transparent" className={classes.navLink}>
						Beranda
					</Button>
				</Link>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Link href="/patroli">
					<Button color="transparent" className={classes.navLink}>
						Patroli
					</Button>
				</Link>
			</ListItem>
			<ListItem className={classes.listItem}>
				<CustomDropdown
					noLiPadding
					navDropdown
					buttonText="Pelaporan"
					buttonProps={{
						className: classes.navLink,
						color: 'transparent'
					}}
					dropdownList={[
						<Link href="/pelaporan/surat-tugas" key="data">
							<a className={classes.dropdownLink}>Surat Tugas</a>
						</Link>,
						<Link href="/pelaporan/rentang-tanggal" key="access">
							<a className={classes.dropdownLink}>
								Rentang Tanggal
							</a>
						</Link>
					]}
				/>
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
						pengguna_html,
						akses_html,
						penugasan_html,
						wilayah_html
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
				<Link href="https://ipbgis.maps.arcgis.com/apps/webappviewer/index.html?id=cc200b3e4bff48a28573398a2ac51b24">
					<Button color="transparent" className={classes.navLink}>
						Analisis
					</Button>
				</Link>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Link href="/about">
					<Button color="transparent" className={classes.navLink}>
						Tentang Sistem
					</Button>
				</Link>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Link href="/faq">
					<Button color="transparent" className={classes.navLink}>
						FAQ
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
