import styles from '@asset/jss/nextjs-material-kit/components/cardHeaderStyle'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'

const useStyles = makeStyles(styles)

export default function CardHeader(props: {
	className: string
	color: string
	plain?: boolean
	children: ReactNode
}) {
	const classes = useStyles()
	const { className, children, color, plain, ...rest } = props
	const cardHeaderIndex = (color + 'CardHeader') as 'cardHeader'
	const cardHeaderClasses = classNames({
		[classes.cardHeader]: true,
		[classes[cardHeaderIndex]]: color,
		[classes.cardHeaderPlain]: plain,
		[className]: className !== undefined
	})
	return (
		<div className={cardHeaderClasses} {...rest}>
			{children}
		</div>
	)
}

CardHeader.propTypes = {
	className: PropTypes.string,
	color: PropTypes.oneOf(['warning', 'success', 'danger', 'info', 'primary']),
	plain: PropTypes.bool,
	children: PropTypes.node
}
