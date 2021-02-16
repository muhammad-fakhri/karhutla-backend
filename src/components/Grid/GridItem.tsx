import { Grid, GridTypeMap, makeStyles, StyleRules } from '@material-ui/core'
import { DefaultComponentProps } from '@material-ui/core/OverridableComponent'
import PropTypes from 'prop-types'
import React from 'react'

const styles: StyleRules<'grid'> = {
	grid: {
		position: 'relative',
		width: '100%',
		minHeight: '1px',
		paddingRight: '15px',
		paddingLeft: '15px',
		flexBasis: 'auto'
	}
}

const useStyles = makeStyles(styles)

export default function GridItem(props: DefaultComponentProps<GridTypeMap>) {
	const classes = useStyles()
	const { children, className, ...rest } = props
	return (
		<Grid item {...rest} className={classes.grid + ' ' + className}>
			{children}
		</Grid>
	)
}

GridItem.defaultProps = {
	className: ''
}

GridItem.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string
}
