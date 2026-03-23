import avatarSrc from '@/assets/images/avatar.png?url'
import { baseUrl } from '@/utils/url'

const author = {
  name: 'A.Sudo',
  summary: 'FRONT-END DEVELOPER & DESIGNER.',
}

/**
 * 作成者
 *
 * @return {JSX.Element}
 */
const Bio = () => {
  const base = baseUrl()
  return (
    <div
      style={{
        display: `flex`,
        margin: `calc(1rem / 2) calc(1rem / -4)`,
      }}
    >
      <div
        style={{
          marginRight: `calc(1rem / 4)`,
          flexBasic: `70px`,
          width: `70px`,
          height: `70px`,
          clipPath: `circle(30px at 50% 45%)`,
        }}
      >
        <img
          src={avatarSrc}
          alt={author.name}
          style={{
            display: `block`,
            width: `100%`,
            height: `100%`,
          }}
        />
      </div>
      <div style={{ flex: `1`, fontSize: `0.875rem` }}>
        <strong>{author.name}</strong>{' '}
        <span style={{ display: 'inline-block' }}>{author.summary}</span>
        <br />
        <a href={`${base}about`}>&rarr; Read about me.</a>
      </div>
    </div>
  )
}

export default Bio
