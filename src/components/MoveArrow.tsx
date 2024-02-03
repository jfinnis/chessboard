import Xarrow from 'react-xarrows'

type MoveArrowProps = {
    startId: string
    endId: string
}

export default function MoveArrowComponent({ startId, endId }: MoveArrowProps) {
    return <Xarrow
        divContainerProps={{ className: 'm-move-arrow' }}
        start={startId}
        end={endId}
        startAnchor="middle"
        endAnchor="middle"
        path="straight"
        zIndex={3}
    />
}
