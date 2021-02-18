import styles from '@asset/jss/nextjs-material-kit/components/cardBodyStyle'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'

const useStyles = makeStyles(styles)

export default function CardBody(props: {
	className: string
	children: ReactNode
}) {
	const classes = useStyles()
	const { className, children, ...rest } = props
	const cardBodyClasses = classNames({
		[classes.cardBody]: true,
		[className]: className !== undefined
	})
	return (
		<div className={cardBodyClasses} {...rest}>
			{children}
		</div>
	)
}

CardBody.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
}
