import { Icon, List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import styles from '../../assets/jss/nextjs-material-kit/components/headerLinksStyle'
import useAuth from '../../context/auth'
import Button from '../CustomButtons/Button'
import CustomDropdown from '../CustomDropdown/CustomDropdown'

const useStyles = makeStyles(styles)

const AuthenticatedMenu = (props) => {
	const classes = useStyles()

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
						</Link>,
						<Link href="/wilayah" key="task">
							<a className={classes.dropdownLink}>
								Wilayah Kerja
							</a>
						</Link>
					]}
				/>
			</ListItem>
			<ListItem className={classes.listItem}>
				<CustomDropdown
					noLiPadding
					navDropdown
					buttonText="Hotspot"
					buttonProps={{
						className: classes.navLink,
						color: 'transparent'
					}}
					dropdownList={[
						<Link href="/hotspot" key="data">
							<a className={classes.dropdownLink}>Titik Panas</a>
						</Link>,
						<Link
							href="https://ipbgis.maps.arcgis.com/apps/webappviewer/index.html?id=34b0d11f424d47349bb06c8fda55913d"
							key="access"
						>
							<a className={classes.dropdownLink} target="_blank">
								Analisis
							</a>
						</Link>
					]}
				/>
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
