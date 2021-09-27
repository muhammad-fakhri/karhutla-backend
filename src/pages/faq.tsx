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
import React from 'react'
import Icon from '@material-ui/core/Icon'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(styles)

function FAQPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const [date, setDate] = useState(moment())
	const [expanded, setExpanded] = React.useState('panel1')
	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false)
	}

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

						<div>
							<Accordion
								square
								expanded={expanded === 'panel1'}
								onChange={handleChange('panel1')}
							>
								<AccordionSummary
									aria-controls="panel1d-content"
									id="panel1d-header"
								>
									<Icon>add_circle</Icon>
									<Typography>
										&nbsp;&nbsp;&nbsp;Gagal Upload Surat
										Tugas
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography align="left">
										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												style={{
													backgroundColor: '#F6F6F6'
												}}
											>
												<Typography>
													Cek Penulisan Jabatan
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>
													<Box
														fontWeight="fontWeightBold"
														m={1}
													>
														Penulisan yang sering
														keliru:
													</Box>
													- Ketua Tim <br></br>-
													Anggota Tim <br></br>-
													Polisi <br></br>- Tentara{' '}
													<br></br>
													<Box
														fontWeight="fontWeightBold"
														m={1}
													>
														Penulisan yang benar:
													</Box>
													- Ketua <br></br>- Anggota{' '}
													<br></br>- Polri <br></br>-
													TNI <br></br>- MPA <br></br>
												</Typography>
											</AccordionDetails>
										</Accordion>

										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												style={{
													backgroundColor: '#F6F6F6'
												}}
											>
												<Typography>
													Cek Reg, Email dan nomor
													Handphone
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>
													Untuk TNI, Polri, dan MPA
													kolom reg, email serta no HP
													di tuliskan nama sesuai
													dengan kolom nama tanpa
													spasi .
												</Typography>
											</AccordionDetails>
										</Accordion>

										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												style={{
													backgroundColor: '#F6F6F6'
												}}
											>
												<Typography>
													Cek Daerah Operasi
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>
													Daerah Operasi diisikan
													dengan kodefikasi
												</Typography>
											</AccordionDetails>
										</Accordion>

										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												style={{
													backgroundColor: '#F6F6F6'
												}}
											>
												<Typography>
													Cek Nomor SK
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>
													Nomor SK dari baris atas ke
													bawah harus sama
												</Typography>
											</AccordionDetails>
										</Accordion>

										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												style={{
													backgroundColor: '#F6F6F6'
												}}
											>
												<Typography>
													Cek Format Tanggal pada
													Surat Tugas
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>
													Format tanggal yang benar
													adalah text
												</Typography>
											</AccordionDetails>
										</Accordion>

										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												style={{
													backgroundColor: '#F6F6F6'
												}}
											>
												<Typography>
													Cek Daerah Patroli,
													Kecamatan, Kabupaten,
													Provinsi
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>
													Penulisan nama daerah harus
													sesuai dengan di database
													jika nama daerah belum ada
													maka harus di tambahkan oleh
													admin
												</Typography>
											</AccordionDetails>
										</Accordion>

										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												style={{
													backgroundColor: '#F6F6F6'
												}}
											>
												<Typography>
													Error Baris tidak dapat
													diproses
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>
													Hapus Baris kosong di bawah
													tabel yang terisi atau copy
													tabel ke file Excel baru
												</Typography>
											</AccordionDetails>
										</Accordion>

										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												style={{
													backgroundColor: '#F6F6F6'
												}}
											>
												<Typography>
													Format file yang di upload
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>
													Format file yang di upload
													harus .XLSX
												</Typography>
											</AccordionDetails>
										</Accordion>

										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												style={{
													backgroundColor: '#F6F6F6'
												}}
											>
												<Typography>
													Network Error
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>
													Upload saat sinyal bagus
												</Typography>
											</AccordionDetails>
										</Accordion>
									</Typography>
								</AccordionDetails>
							</Accordion>
							<br></br>
						</div>
					</Container>
				</div>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(FAQPage)
