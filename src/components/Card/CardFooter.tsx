import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'
import styles from '../../assets/jss/nextjs-material-kit/components/cardFooterStyle'

const useStyles = makeStyles(styles)

export default function CardFooter(props: {
	className: string
	children: ReactNode
}) {
	const classes = useStyles()
	const { className, children, ...rest } = props
	const cardFooterClasses = classNames({
		[classes.cardFooter]: true,
		[className]: className !== undefined
	})
	return (
		<div className={cardFooterClasses} {...rest}>
			{children}
		</div>
	)
}

CardFooter.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
}
