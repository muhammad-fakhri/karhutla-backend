import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { Typography, TextField } from '@material-ui/core'
// core components
import GridContainer from '../components/Grid/GridContainer'
import GridItem from '../components/Grid/GridItem'
import Loader from '../components/Loader/Loader'
import Parallax from '../components/Parallax/Parallax'
import profile from '../assets/img/user.jpg'
import styles from '../assets/jss/nextjs-material-kit/pages/profile.page.style'
import profileBgImage from '../assets/img/profile-bg.jpg'
import SiteLayout from '../components/Layout/SiteLayout'
import useAuth, { ProtectRoute } from '../context/auth'

const useStyles = makeStyles(styles)

function ProfilePage() {
	const classes = useStyles()
	const { isAuthenticated, user } = useAuth()
	const imageClasses = classNames(
		classes.imgRaised,
		classes.imgRoundedCircle,
		classes.imgFluid
	)

	if (isAuthenticated) {
		console.log(user)
	}

	return !isAuthenticated ? (
		<Loader />
	) : (
		<SiteLayout scrollChange={true}>
			<div>
				<Parallax small filter image={profileBgImage} />
				<div className={classNames(classes.main, classes.mainRaised)}>
					<div>
						<div className={classes.container}>
							<GridContainer justify="center">
								<GridItem xs={12} sm={12} md={6}>
									<div className={classes.profile}>
										<div>
											<img
												src={user.photo || profile}
												alt="..."
												className={imageClasses}
											/>
										</div>
										<div className={classes.name}>
											<h3 className={classes.title}>
												{user.name}
											</h3>
										</div>
									</div>
								</GridItem>
							</GridContainer>
							<div className={classes.description}>
								<Typography
									variant="h6"
									gutterBottom
									align="center"
									className={classes.descriptionItem}
								>
									Data Pengguna
								</Typography>
								<TextField
									className={classes.descriptionItem}
									disabled
									label="Email"
									fullWidth
									defaultValue={user.email}
									color="secondary"
									variant="outlined"
								/>
								<TextField
									className={classes.descriptionItem}
									disabled
									label="Nomor Registrasi"
									fullWidth
									defaultValue={user.registrationNumber}
									variant="outlined"
								/>
								<TextField
									className={classes.descriptionItem}
									disabled
									label="Nomor Telepon"
									fullWidth
									defaultValue={user.phoneNumber}
									variant="outlined"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SiteLayout>
	)
}
export default ProtectRoute(ProfilePage)
