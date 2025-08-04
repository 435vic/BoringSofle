module.exports = {
  params: {
    designator: 'SW',
    side: 'F',
    A: { type: 'net', value: 'undefined' },
    B: { type: 'net', value: 'undefined' },
    C: { type: 'net', value: 'undefined' },
    D: { type: 'net', value: 'undefined' },
    CTR: { type: 'net', value: 'undefined' },
    CMN: { type: 'net', value: 'undefined' },
  },
  body: p => {
    // Middle pads are offset from the center to enforce correct orientation
    const middle_pads_y = p.side == 'F' ? 0.45 : -0.45;

    // Flip pins if side is B
    const right = p.side == 'B' ? '-' : '';
    const left = p.side == 'F' ? '-' : '';

    const pads = `
  ${'' /* Corner pads - 1.9 diameter, 1.2 drill */}
  (pad "A" thru_hole circle (at ${left}5.15 3.25 ${p.r}) (size 1.9 1.9) (drill 1.2) (layers "*.Cu" "*.Mask"))
  (pad "Center" thru_hole circle (at ${right}5.15 3.25 ${p.r}) (size 1.9 1.9) (drill 1.2) (layers "*.Cu" "*.Mask"))
  (pad "C" thru_hole circle (at ${left}5.15 -3.25 ${p.r}) (size 1.9 1.9) (drill 1.2) (layers "*.Cu" "*.Mask"))
  (pad "Common" thru_hole circle (at ${right}5.15 -3.25 ${p.r}) (size 1.9 1.9) (drill 1.2) (layers "*.Cu" "*.Mask"))
  ${'' /* Side pads - 1.7 dia, 1 drill */}
  (pad "B" thru_hole circle (at ${left}5.15 ${middle_pads_y} ${p.r}) (size 1.5 1.5) (drill 1) (layers "*.Cu" "*.Mask"))
  (pad "D" thru_hole circle (at ${right}5.15 ${middle_pads_y} ${p.r}) (size 1.5 1.5) (drill 1) (layers "*.Cu" "*.Mask"))
    `

    const template = `
  (footprint "boredvico:sqku_5way_nav_switch"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 -3.5)
      (layer "${p.side}.${p.include_silkscreen ? 'SilkS' : 'Fab'}")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15))${p.side == 'B' ? ' (justify mirror)' : ''}) 
    )
    (attr through_hole)
    ${pads}
    (fp_rect (start -5 -5) (end 5 5) (layer "Dwgs.User") (stroke (width 0.15) (type solid)) (fill none))
  )
    `
    return template;
  },
};
