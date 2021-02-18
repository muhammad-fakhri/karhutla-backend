import styles from '@asset/jss/nextjs-material-kit/components/cardStyle'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'

const useStyles = makeStyles(styles)

export default function Card(props: {
	className: string
	children: ReactNode
	plain?: boolean
	carousel?: boolean
}) {
	const classes = useStyles()
	const { className, children, plain, carousel, ...rest } = props
	const cardClasses = classNames({
		[classes.card]: true,
		[classes.cardPlain]: plain,
		[classes.cardCarousel]: carousel,
		[className]: className !== undefined
	})
	return (
		<div className={cardClasses} {...rest}>
			{children}
		</div>
	)
}

Card.propTypes = {
	className: PropTypes.string,
	plain: PropTypes.bool,
	carousel: PropTypes.bool,
	children: PropTypes.node
}
