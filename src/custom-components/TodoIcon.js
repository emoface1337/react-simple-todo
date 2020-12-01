import React from 'react'

const TodoActionIcon = ({ children, clickAction }) => {

    const childrenWithProps = React.Children.map(children, element =>
        React.cloneElement(element, {
                style: { cursor: 'pointer', color: '#1890ff' },
                onClick: clickAction
            }
        )
    )

    return (
        <>
            {childrenWithProps}
        </>
    )
}

export default TodoActionIcon
