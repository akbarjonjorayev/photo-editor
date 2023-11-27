function shapes(data, mainStyle) {
  const { style, name } = data
  const result = `  <div>
                        <div class="choose_item list_v df_jc_sb">
                            <div class="shape df_ai_jc_ce">
                                <div class="shape_item" style="${style}; background-color: ${mainStyle.backgroundColor}"></div>
                            </div>
                            <div class="choose_item_txt">${name}</div>
                        </div>
                    </div>`

  return result
}

function editMoving(html, { width, height }) {
  const result = `
        <div class="edit_moving" style="width: ${width}px; height: ${height}px">
            ${html}
            <div class="edit_moving_els">
            <div class="edit_moving_bg"></div>
            <div class="edit_moving_lines">
                <div>
                    <div class="edit_moving_line" width></div>
                    <div class="edit_moving_line" width></div>
                </div>
                <div>
                    <div class="edit_moving_line" height></div>
                    <div class="edit_moving_line" height></div>
                </div>
            </div>
            <div class="edit_moving_points">
                <div class="edit_moving_point"></div>
                <div class="edit_moving_point"></div>
                <div class="edit_moving_point"></div>
                <div class="edit_moving_point"></div>
            </div>
            </div>
        </div>
    `
  return result
}

function searchPhoto(url) {
  const result = `
    <div>
        <div class="choose_item search_photo_item df_ai_jc_ce">
            <img src="${url}">
        </div>
    </div>
    `

  return result
}

export { shapes, editMoving, searchPhoto }
