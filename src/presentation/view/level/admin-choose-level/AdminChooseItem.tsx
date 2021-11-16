import React from 'react'

import Grid from '@material-ui/core/Grid'

import StringUtils from '../../../../utils/StringUtils'

import whiteCircle from '../../../../assets/img/channels/white-ellipse.svg'
import blueEllipse from '../../../../assets/img/channels/blue-circle.svg'
import whiteEllipse from '../../../../assets/img/channels/white-circle-icon.svg'
import LevelsList from '../../../../domain/models/channel/LevelsList'

interface Props {
  level: LevelsList
  setChoosedLevel(choosedId: number): void
  сhoosedLevelsId?: number[]
  isChosedLevel: boolean
}

const AdminChooseItem = (props: Props) => {
  const { name, price_per_month, id, level_image_link } = props.level
  const { isChosedLevel } = props

  return (
    <div style={{ paddingTop: '25px' }}>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <div className="d-flex justify-content-center pt-3">
            <img
              src={level_image_link ? level_image_link : whiteCircle}
              style={{
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
              className="user-icon"
              alt="level icon"
            />
          </div>
        </Grid>

        <Grid xs={8}>
          <div style={{ paddingTop: '18px' }}>
            <div className="d-flex">
              <div className="choose-level-title">
                {StringUtils.capitalizeFirstLetter(name)}
              </div>
            </div>
          </div>

          <div className="text-gray">${price_per_month} в месяц</div>
        </Grid>

        <Grid xs={2}>
          <div className="d-flex justify-content-center pt-3">
            <img
              src={isChosedLevel ? blueEllipse : whiteEllipse}
              alt="blue ellipse"
              style={{ width: '36px', height: '36px', cursor: 'pointer' }}
              onClick={() => {
                props.setChoosedLevel(id)
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminChooseItem
