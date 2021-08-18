import styles from '@asset/jss/nextjs-material-kit/pages/faq.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import moment from 'moment'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Container from '@material-ui/core/Container'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const useStyles = makeStyles(styles)

function FAQPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const [date, setDate] = useState(moment())

	return !isAuthenticated ? (
		<Loader />
	) : (
		<SiteLayout headerColor="info">
			<div>
				<div
					className={classNames(
						classes.main,
						classes.mainRaised,
						classes.textCenter
					)}
				>
					<Container maxWidth="md">
						<h1>FAQs</h1>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className="heading">
									Accordion 1
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Suspendisse malesuada lacus
									ex, sit amet blandit leo lobortis eget.
								</Typography>
							</AccordionDetails>
						</Accordion>

						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel2a-content"
								id="panel2a-header"
							>
								<Typography className="heading">
									Accordion 2
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Suspendisse malesuada lacus
									ex, sit amet blandit leo lobortis eget.
								</Typography>
							</AccordionDetails>
						</Accordion>
					</Container>
				</div>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(FAQPage)
