import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Loader from 'components/Loader/Loader'
import Parallax from 'components/Parallax/Parallax.js'
import SiteLayout from '../components/Layout/SiteLayout'
import useAuth, { ProtectRoute } from '../context/auth'
import profile from 'assets/img/user.png'

import styles from 'assets/jss/nextjs-material-kit/pages/profilePage.js'

const useStyles = makeStyles(styles)

function ProfilePage(props) {
	const classes = useStyles()
	const { isAuthenticated, user } = useAuth()
	const { ...rest } = props
	const imageClasses = classNames(
		classes.imgRaised,
		classes.imgRoundedCircle,
		classes.imgFluid
	)
	const navImageClasses = classNames(classes.imgRounded, classes.imgGallery)
	return !isAuthenticated ? (
		<Loader />
	) : (
		<SiteLayout scrollChange={true}>
			<div>
				<Parallax small filter image={require('assets/img/profile-bg.jpg')} />
				<div className={classNames(classes.main, classes.mainRaised)}>
					<div>
						<div className={classes.container}>
							<GridContainer justify="center">
								<GridItem xs={12} sm={12} md={6}>
									<div className={classes.profile}>
										<div>
											<img src={profile} alt="..." className={imageClasses} />
										</div>
										<div className={classes.name}>
											<h3 className={classes.title}>{user.name}</h3>
											<h6>{user.email}</h6>
										</div>
									</div>
								</GridItem>
							</GridContainer>
							<div className={classes.description}>
								<Typography variant="body1" gutterBottom align="justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  luctus odio nibh, in ornare urna placerat non. Mauris nisl
                  dui, pharetra vitae lectus et, gravida imperdiet orci. Mauris
                  libero mauris, iaculis in tristique ut, auctor at libero.
                  Aliquam id volutpat ipsum, eu volutpat nisi. Vivamus diam
                  erat, pretium id accumsan nec, pulvinar at mi. Ut neque sem,
                  auctor sed sagittis non, sollicitudin at ante. Ut at quam eget
                  nisl vulputate pretium. Vivamus lacinia arcu et felis pulvinar
                  hendrerit.
								</Typography>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SiteLayout>
	)
}
export default ProtectRoute(ProfilePage)
