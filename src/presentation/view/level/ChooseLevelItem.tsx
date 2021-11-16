import React from 'react'

import Grid from '@material-ui/core/Grid'

import whiteEllipse from '../../../assets/img/channels/white-ellipse.svg'
import appleIcon from '../../../assets/img/channels/appleIcon.svg'
import LevelsList from '../../../domain/models/channel/LevelsList'
import DateUtils from '../../../utils/DateUtils'

interface Props {
  level: LevelsList
  setIsShowMenuBar(isShowMenuBar: boolean, levelId: number): void
  expires: string
}

const ChooseLevelItem = (props: Props) => {
  const { name, description, price_per_month, id, level_image_link } =
    props.level

  return (
    <div style={{ paddingTop: '25px' }}>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <div className="d-flex justify-content-center pt-3">
            <img
              src={level_image_link ? level_image_link : whiteEllipse}
              alt="white ellipse"
              width="42"
              height="42"
            />
          </div>
        </Grid>

        <Grid xs={9}>
          <div style={{ paddingTop: '10px' }}>
            <div className="d-flex">
              <div className="choose-level-title" style={{ paddingTop: '3px' }}>
                {name}
              </div>
              <div
                className="text-gray"
                style={{ paddingLeft: '4px', paddingTop: '3px' }}
              >
                ${price_per_month} в месяц
              </div>
            </div>

            <div className="text-gray">{description}</div>

            <div className="pt-2">
              <div
                className={
                  props.expires
                    ? 'large-button-choose-level-wrapper'
                    : 'button-choose-level-wrapper'
                }
              >
                <button>
                  <div className="d-flex">
                    <div className="button-choose-image pt-1">
                      <img
                        src={level_image_link ? level_image_link : appleIcon}
                        alt="level"
                        width="24"
                        height="24"
                      />
                    </div>
                    <div
                      className="button-choose-level-text"
                      onClick={(): void => {
                        props.setIsShowMenuBar(true, id)
                      }}
                    >
                      {props.expires
                        ? `Участник · ${props.expires}`
                        : 'Присоединиться'}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default ChooseLevelItem
