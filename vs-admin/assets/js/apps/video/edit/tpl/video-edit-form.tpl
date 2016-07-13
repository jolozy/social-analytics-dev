<div class="pageheader">
  <h2><i class="fa fa-video-camera"></i> Video
  <span>Edit Video Information...</span>
    <div class="btn-group mr5 pull-right">
      <button type="button" class="btn btn-default js-save">Save</button>
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
        <span class="caret"></span>
        <span class="sr-only">More options</span>
      </button>
        <ul class="dropdown-menu" role="menu">
          <li><a class="js-delete">Delete</a></li>
          <li><a href="#video">Discard</a></li>
        </ul>
    </div>
  </h2>
</div>

<div class="contentpanel">

    <div class="row">
        <div class="panel-group panel-group-dark" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" class="collapsed" data-parent="#accordion" href="#collapse-note">
                            Notes
                        </a>
                    </h4>
                </div>
                <div id="collapse-note" class="panel-collapse collapse">
                    <div class="panel-body">
                        <div class="form-group">
                            <textarea id="note" class="form-control" rows="5"></textarea>
                        </div>
                        <div class="form-group">
                            <div class="pull-right">
                                <button class="btn btn-white js-save-note">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 video-edit">
        <ul class="nav nav-tabs js-video-tabs">
          <li><a data-toggle="tab" href="#basic" class="js-video-tab">Basic</a></li>
          <li><a data-toggle="tab" href="#advanced" class="js-video-tab">Film Info</a></li>
          <li><a data-toggle="tab" href="#images" class="js-video-tab">Images</a></li>
          <li><a data-toggle="tab" href="#video" class="js-video-tab">Video File</a></li>
          <li><a data-toggle="tab" href="#translations" class="js-translation-tab">Translations</a></li>
          <!-- <li><a data-toggle="tab" href="#collections" class="js-video-tab">Collections</a></li> -->
          <li><a data-toggle="tab" href="#creator" class="js-video-tab" style="display:none">Creator/License</a></li>
          <li><a data-toggle="tab" href="#medialibrary" class="js-video-tab">Media Library</a></li>
        </ul>
        <div class="tab-content">

            <div class="tab-pane" id="basic">
              <h1>Basic Information</h1>
              <form class="form form-horizontal form-bordered">

                <div class="form-group">
                  <label class="col-sm-3 control-label">Title</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Title" id="title" name="title" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Friendly URL</label>
                  <div class="col-sm-6">
                    <input type="text" placeholder="Friendly URL" class="form-control" id="friendly_url" />
                  <span class="help-block">A url friendly version of the film title...</span>
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">URL Preview</label>
                  <div class="col-sm-6">
                    <input type="text" placeholder="" class="form-control js-preview-url" readonly onClick="this.select()" />
                    <span class="help-block">Click to highlight URL</span>
                  </div>
                </div><!-- form-group -->

                  <h2>Publish Settings</h2>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">Publish Date</label>
                    <div class="col-sm-6 input-group">
                      <input type="text" class="form-control datepicker js-published-date" placeholder="mm/dd/yyyy">
                      <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                    </div>
                  </div><!-- form-group -->

                  <div class="form-group">
                    <label class="col-sm-3 control-label">Publish Time</label>
                    <div class="col-sm-6 input-group mb15">
                      <div class="bootstrap-timepicker"><input type="text" class="form-control timepicker js-published-time"/></div>
                      <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                    </div>
                  </div><!-- form-group -->

                  <div class="form-group">
                    <label class="col-sm-3 control-label">Programme Date</label>
                    <div class="col-sm-6 input-group">
                      <input type="text" class="form-control datepicker js-programme-date" placeholder="mm/dd/yyyy">
                      <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                    </div>
                  </div><!-- form-group -->

                  <div class="form-group">
                    <label class="col-sm-3 control-label">Programme Time</label>
                    <div class="col-sm-6 input-group mb15">
                      <div class="bootstrap-timepicker"><input type="text" class="form-control timepicker js-programme-time" placeholder="12:00 AM"></div>
                      <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                    </div>
                  </div><!-- form-group -->

                  <div class="row form-group">
                    <div class="col-sm-6">
                      <label class="col-sm-6 control-label">Published</label>
                      <div class="col-sm-6 control-label">
                        <div class="toggle toggle-success" id="published"></div>
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <label class="col-sm-6 control-label">Featured</label>
                      <div class="col-sm-6 control-label">
                        <div class="toggle toggle-success" id="featured"></div>
                      </div>
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-sm-6">
                      <label class="col-sm-6 control-label">Show Ads</label>
                      <div class="col-sm-6 control-label">
                        <div class="toggle toggle-success" id="advertising"></div>
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <label class="col-sm-6 control-label">Excluded (Except Search)</label>
                      <div class="col-sm-6 control-label">
                        <div class="toggle toggle-danger" id="excluded"></div>
                      </div>
                    </div>
                  </div>

                  <div class="row form-group">
                    <div class="col-sm-6">
                      <label class="col-sm-6 control-label">Do Not Show</label>
                      <div class="col-sm-6 control-label">
                        <div class="toggle toggle-danger" id="do_not_show"></div>
                      </div>
                    </div>
                  </div>

                  <h2>Weekly Curation</h2>
                  <div class="form-group">
                  <label class="col-sm-3 control-label">Curation Bucket</label>
                  <div class="col-sm-6">
                    <select class="chosen-select" data-placeholder="Bucket" id="bucket" name="bucket">
                      <option value="">No Bucket</option>
                      <option value="CC01">Tear Jerker</option>
                      <option value="CC02">Horror</option>
                      <option value="CC03">Suspense</option>
                      <option value="CC04">Light-Hearted</option>
                      <option value="CC05">Reality Check</option>
                      <option value="CC06">Acceptance</option>
                      <option value="CC07">Mindf***</option>
                      <option value="CC08">Growing Up</option>
                      <option value="CC09">I Want Love</option>
                      <option value="CC10">Enlighten Me</option>
                    </select>
                  </div>
                </div><!-- form-group -->

              </form>
            </div><!-- basic -->

            <div class="tab-pane" id="advanced">
              <h1>Film Info</h1>
              <form class="form form-horizontal form-bordered">

                <div class="form-group">
                  <label class="col-sm-3 control-label">Year</label>
                  <div class="col-sm-6">
                    <div class="input-group mb15">
                      <input type="text" placeholder="yyyy" id="year" name="year" class="form-control" />
                    </div>
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Log Line</label>
                  <!-- <div class="col-sm-7">
                    <textarea id="description_short" name="description_short" class="form-control wysiwyg" rows="5"></textarea>
                  </div> -->
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="" id="description_short" name="description_short" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Description</label>
                  <div class="col-sm-7">
                    <textarea id="description_long" name="description_long" class="form-control wysiwyg" rows="5"></textarea>
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Directors</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Directors" id="directors" name="directors" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Cast</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Cast" id="cast" name="cast" />
                  </div>
                </div><!-- form-group -->

                <!-- <div class="form-group">
                  <label class="col-sm-3 control-label">Crew</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Crew" id="crew" name="crew" />
                  </div>
                </div> --><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Festivals</label>
                  <div class="col-sm-7">
                    <textarea id="festivals" name="festivals" class="form-control wysiwyg" rows="5"></textarea>
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Country</label>
                  <div class="col-sm-6">
                    <select class="chosen-select" multiple data-placeholder="Choose a Country..." id="country" name="country">
                      <option value=""></option>
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Japan">Japan</option>
                      <option value="Afghanistan">Afghanistan</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="American Samoa">American Samoa</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Angola">Angola</option>
                      <option value="Anguilla">Anguilla</option>
                      <option value="Antarctica">Antarctica</option>
                      <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Aruba">Aruba</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahamas">Bahamas</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Barbados">Barbados</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Belize">Belize</option>
                      <option value="Benin">Benin</option>
                      <option value="Bermuda">Bermuda</option>
                      <option value="Bhutan">Bhutan</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                      <option value="Botswana">Botswana</option>
                      <option value="Bouvet Island">Bouvet Island</option>
                      <option value="Brazil">Brazil</option>
                      <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                      <option value="Brunei Darussalam">Brunei Darussalam</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Burundi">Burundi</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Cape Verde">Cape Verde</option>
                      <option value="Cayman Islands">Cayman Islands</option>
                      <option value="Central African Republic">Central African Republic</option>
                      <option value="Chad">Chad</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Christmas Island">Christmas Island</option>
                      <option value="Cocos Islands">Cocos Islands</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Comoros">Comoros</option>
                      <option value="Congo">Congo</option>
                      <option value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</option>
                      <option value="Cook Islands">Cook Islands</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Cote d'Ivoire">Cote d'Ivoire</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cuba">Cuba</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Djibouti">Djibouti</option>
                      <option value="Dominica">Dominica</option>
                      <option value="Dominican Republic">Dominican Republic</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Egypt">Egypt</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Equatorial Guinea">Equatorial Guinea</option>
                      <option value="Eritrea">Eritrea</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Falkland Islands">Falkland Islands</option>
                      <option value="Faroe Islands">Faroe Islands</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="French Guiana">French Guiana</option>
                      <option value="French Polynesia">French Polynesia</option>
                      <option value="Gabon">Gabon</option>
                      <option value="Gambia">Gambia</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Gibraltar">Gibraltar</option>
                      <option value="Greece">Greece</option>
                      <option value="Greenland">Greenland</option>
                      <option value="Grenada">Grenada</option>
                      <option value="Guadeloupe">Guadeloupe</option>
                      <option value="Guam">Guam</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Guinea">Guinea</option>
                      <option value="Guinea-Bissau">Guinea-Bissau</option>
                      <option value="Guyana">Guyana</option>
                      <option value="Haiti">Haiti</option>
                      <option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
                      <option value="Honduras">Honduras</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Iceland">Iceland</option>
                      <option value="India">India</option>
                      <option value="Iran">Iran</option>
                      <option value="Iraq">Iraq</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Kiribati">Kiribati</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      <option value="Laos">Laos</option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Lesotho">Lesotho</option>
                      <option value="Liberia">Liberia</option>
                      <option value="Libya">Libya</option>
                      <option value="Liechtenstein">Liechtenstein</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Macao">Macao</option>
                      <option value="Madagascar">Madagascar</option>
                      <option value="Malawi">Malawi</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Mali">Mali</option>
                      <option value="Malta">Malta</option>
                      <option value="Marshall Islands">Marshall Islands</option>
                      <option value="Martinique">Martinique</option>
                      <option value="Mauritania">Mauritania</option>
                      <option value="Mauritius">Mauritius</option>
                      <option value="Mayotte">Mayotte</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Micronesia">Micronesia</option>
                      <option value="Moldova">Moldova</option>
                      <option value="Monaco">Monaco</option>
                      <option value="Mongolia">Mongolia</option>
                      <option value="Montenegro">Montenegro</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Mozambique">Mozambique</option>
                      <option value="Myanmar">Myanmar</option>
                      <option value="Namibia">Namibia</option>
                      <option value="Nauru">Nauru</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Netherlands Antilles">Netherlands Antilles</option>
                      <option value="New Caledonia">New Caledonia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Nicaragua">Nicaragua</option>
                      <option value="Niger">Niger</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Norfolk Island">Norfolk Island</option>
                      <option value="North Korea">North Korea</option>
                      <option value="Norway">Norway</option>
                      <option value="Oman">Oman</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Palau">Palau</option>
                      <option value="Palestinian Territory">Palestinian Territory</option>
                      <option value="Panama">Panama</option>
                      <option value="Papua New Guinea">Papua New Guinea</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Peru">Peru</option>
                      <option value="Pitcairn">Pitcairn</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Puerto Rico">Puerto Rico</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Romania">Romania</option>
                      <option value="Russian Federation">Russian Federation</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Saint Helena">Saint Helena</option>
                      <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                      <option value="Saint Lucia">Saint Lucia</option>
                      <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                      <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                      <option value="Samoa">Samoa</option>
                      <option value="San Marino">San Marino</option>
                      <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Serbia">Serbia</option>
                      <option value="Seychelles">Seychelles</option>
                      <option value="Sierra Leone">Sierra Leone</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Solomon Islands">Solomon Islands</option>
                      <option value="Somalia">Somalia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="South Georgia">South Georgia</option>
                      <option value="Spain">Spain</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Sudan">Sudan</option>
                      <option value="Suriname">Suriname</option>
                      <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                      <option value="Swaziland">Swaziland</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                      <option value="Tajikistan">Tajikistan</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="The Former Yugoslav Republic of Macedonia">The Former Yugoslav Republic of Macedonia</option>
                      <option value="Timor-Leste">Timor-Leste</option>
                      <option value="Togo">Togo</option>
                      <option value="Tokelau">Tokelau</option>
                      <option value="Tonga">Tonga</option>
                      <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Tuvalu">Tuvalu</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Vanuatu">Vanuatu</option>
                      <option value="Vatican City">Vatican City</option>
                      <option value="Venezuela">Venezuela</option>s
                      <option value="Virgin Islands, British">Virgin Islands, British</option>
                      <option value="Virgin Islands, U.S">Virgin Islands, U.S.</option>
                      <option value="Wallis and Futuna">Wallis and Futuna</option>
                      <option value="Western Sahara">Western Sahara</option>
                      <option value="Yemen">Yemen</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">Language</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Language" id="language" name="language" />
                  </div>
                </div><!-- form-group -->
                
                <div class="form-group">
                  <label class="col-sm-3 control-label">Subtitle Language</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Subtitle Language" id="subtitle_language" name="subtitle_language" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Genre</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control tags" placeholder="" id="genres" name="genres" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Topic</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control tags" placeholder="" id="topics" name="topics" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Tags</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control tags" placeholder="" id="meta_tags" name="meta_tags" />
                  </div>
                </div><!-- form-group -->

                <!-- <div class="form-group">
                  <label class="col-sm-3 control-label">Period</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Period" id="period" name="period" />
                  </div>
                </div> --><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Content Rating</label>
                  <div class="col-sm-6">
                    <select class="chosen-select" multiple data-placeholder="Content Rating" id="content_rating" name="content_rating">
                      <option value="Violence">Violence</option>
                      <option value="Nudity">Nudity</option>
                      <option value="Drug Use">Drug Use</option>
                      <option value="Coarse and Strong Language">Coarse and Strong Language</option>
                      <option value="Sexual Reference">Sexual Reference</option>
                      <option value="Gore and Disturbing Content">Gore and Disturbing Content</option>
                      <option value="Disturbing Content">Disturbing Content</option>
                      <option value="Mature Theme">Mature Theme</option>
                    </select>
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Website</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Website (http://www.something.com)" id="website_url" name="website_url" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Facebook Page</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Facebook Page (http://www.facebook.com)" id="fb_page_url" name="fb_page_url" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Twitter Handle</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Twitter Handle (greengoblin)" id="tw_handle" name="tw_handle" />
                  </div>
                </div><!-- form-group -->

                <!-- <div class="form-group">
                  <label class="col-sm-3 control-label">Twitter Hashtag</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Twitter Hashtag (#viddsee)" id="tw_hashtag" name="tw_hashtag" />
                  </div>
                </div> --><!-- form-group -->

              </form>
            </div><!-- Advanced -->

            <div class="tab-pane" id="images">
              <h1>Images</h1>

              <h2>Coverphoto</h2>
              <div class="coverphoto">
                <p>Upload an image</p>
                <img src="assets/images/photos/photo5.png" class="img-responsive" alt="" id="coverphoto">
                <a class="js-upload-photo"></a>
              </div>

              <!-- <h2>Gallery</h2>
              <div class="gallery row filemanager">
                <a class="col-lg-3 col-md-4 col-sm-6 js-upload-photo">
                  <div class="card-new itemview-image">
                    <i class="fa fa-plus"></i>
                  </div>
                </a>

              </div> -->
            </div><!-- images -->

            <div class="tab-pane" id="video">
              <h1>Video</h1>

              <div class="video-player mb30">
                <video id="video_file_source_url" controls></video>
              </div>

              <div class="form-group">
                <label class="col-sm-3 control-label">Video File Upload</label>
                <div class="col-sm-6">
                  <input id="source_url" type="text" class="form-control" onClick="this.select();" readonly>
                  <a class="btn btn-primary mt10" data-toggle="modal" data-target=".js-modal-video-upload">Upload/Transcode</a>
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-3 control-label">Duration (min)</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="mins" id="duration" name="duration" />
                </div>
              </div><!-- form-group -->

              <div class="form-group">
                <label class="col-sm-3 control-label">Credits Start Time</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="hh:mm:ss" id="credits_start" name="credits_start" />
                </div>
              </div><!-- form-group -->

              <div class="form-group">
                <label class="col-sm-3 control-label">Vimeo IDs</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" id="vimeo_ids" name="vimeo_ids" />
                </div>
              </div><!-- form-group -->

                <h2>Hosted Files</h2>

                <div class="form-group">
                  <label class="col-sm-3 control-label">HD File</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="https://xxxxxx.cloudfront.com/xxx" id="hosted_hd" name="hosted_hd" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">SD File</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="https://xxxxxx.cloudfront.com/xxx" id="hosted_sd" name="hosted_sd" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Mobile File</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="https://xxxxxx.cloudfront.com/xxx" id="hosted_mo" name="hosted_mo" />
                  </div>
                </div><!-- form-group -->

                <!-- <div class="form-group">
                  <label class="col-sm-3 control-label">HLS File</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="https://xxxxxx.cloudfront.com/xxx" id="hosted_hls" name="hosted_hls" />
                  </div>
                </div> --><!-- form-group -->

                <h2>Vimeo Video Files</h2>

                <div class="form-group">
                  <label class="col-sm-3 control-label">HD File</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="http://player.vimeo.com/xxx" id="vimeo_hd" name="vimeo_hd" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">SD File</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="http://player.vimeo.com/xxx" id="vimeo_sd" name="vimeo_sd" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Mobile File</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="http://player.vimeo.com/xxx" id="vimeo_mo" name="vimeo_mo" />
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">HLS File</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="http://player.vimeo.com/xxx" id="vimeo_hls" name="vimeo_hls" />
                  </div>
                </div><!-- form-group -->

                <h2>Third Party URLs</h2>

                <!-- <div class="form-group">
                  <label class="col-sm-3 control-label">Youtube URL</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Embed URL" id="embed_url" name="embed_youtube_url" />
                  </div>
                </div> --><!-- form-group -->

                <!-- <div class="form-group">
                  <label class="col-sm-3 control-label">Vimeo URL</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Embed URL" id="embed_url" name="embed_vimeo_url" />
                  </div>
                </div> --><!-- form-group -->
                <div class="form-group">
                  <label class="col-sm-3 control-label">Youtube URL</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Youtube URL" id="youtube" name="embed_youtube_url" />
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-3 control-label">Embed URL</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Youtube/Vimeo URL" id="embed_url" name="embed_url" />
                  </div>
                </div><!-- form-group -->
            </div><!-- video -->

            <div class="tab-pane" id="collections">
              <h1>Channels</h1>
              <div class="row">
                <p>This video does not belong to any channel.</p>
              </div>

              <h1>Series</h1>
              <div class="row">
                <p>This video does not belong to any series.</p>
              </div>
            </div><!-- Collections -->

            <div class="tab-pane" id="translations">
              <table class="table table-hover table-hidaction sortable">
              <thead>
                <tr>
                  <th>Locale</th>
                  <th>Title</th>
                  <th class="table-action">
                    <a class="js-new-video-translation-btn">
                        <i class="fa fa-plus"></i>
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody class="js-video-translations-container">

              </tbody>
              </table>
            </div><!-- Translations -->

            <div class="tab-pane" id="creator">
              <h1>Creator Information</h1>
              <form class="form form-horizontal form-bordered">

                <div class="form-group">
                  <label class="col-sm-3 control-label">Name</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="Name" id="creator_name" name="creator_name" readonly/>
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Email</label>
                  <div class="col-sm-6">
                    <input type="text" placeholder="Email" class="form-control" id="creator_email" name="creator_email" onClick="this.select();" readonly/>
                  </div>
                </div><!-- form-group -->

                <div class="form-group">
                  <label class="col-sm-3 control-label">Referral</label>
                  <div class="col-sm-6">
                    <input type="text" placeholder="Referral" class="form-control" id="creator_referral" name="creator_referral"
                      onClick="this.select();" readonly/>
                  </div>
                </div><!-- form-group -->

                  <h2>Rights</h2>

                  <div class="form-group col-sm-6">
                    <label class="col-sm-6 control-label">3rd Party Rights</label>
                    <div class="col-sm-6 control-label">
                      <div class="toggle toggle-success" id="rights_third_party"></div>
                    </div>
                  </div>

                  <div class="form-group col-sm-6">
                    <label class="col-sm-6 control-label">Monetisation</label>
                    <div class="col-sm-6 control-label">
                      <div class="toggle toggle-success" id="rights_monetisation"></div>
                    </div>
                  </div>

              </form>
            </div><!-- Collections -->

            <div class="tab-pane" id="medialibrary">
              <h1>Media Library</h1>
              <div class="panel panel-dark panel-alt">
                  <form action="/" class="dropzone" id="media-library-dropzone">
                    <div class="fallback">
                      <input name="file" type="file" multiple />
                    </div>
                  </form>
              </div>

              <div class="progress progress-striped active media-progress-bar">
                  <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                     <span class="sr-only">40% Complete (success)</span>
                  </div>
              </div>

              <div class="row">
                  <div class="col-md-12">
                      <div class="row">

                          <div class="col-md-12">
                              <div class="col-md-6">
                                  <h4 class="panel-title js-results-title"></h4>
                                  <p class="js-results-stats"></p>
                              </div>
                              <div class="col-md-6">
                                  <ul class="pagination pull-right">

                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row" id="media-library-display">

              </div>
            </div><!-- Media Library -->

        </div><!-- tab-content -->
      </div><!-- video-edit -->

    </div><!-- contentpanel .row -->
</div><!-- contentpanel -->

<div class="modal fade modal-video-upload js-modal-video-upload" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="panel panel-dark panel-alt">
          <div class="panel-heading">
              <h3 class="panel-title">Upload/Transcode Video</h3>
          </div>
          <div class="panel-body form form-horizontal">

            <div class="form-group">
            <label class="col-sm-3 control-label">Video File</label>
              <div class="fileupload col-sm-9 fileupload-new" data-provides="fileupload">
                <div class="input-append">
                  <div class="uneditable-input">
                    <input id="tc_source_url" onClick="this.select();" readonly/>
                  </div>
                  <span class="btn btn-default btn-file">
                    <span class="fileupload-new">Select file</span>
                    <span class="fileupload-exists">Change</span>
                    <input type="file" id="video_file_input" />
                  </span>
                </div>
              </div>
            </div><!-- form-group -->

            <div class="form-group">
              <label class="col-sm-3 control-label">Watermark</label>
              <div class="col-sm-7 control-label">
                <div id="tc_watermark" class="toggle toggle-success"></div>
              </div>
            </div>

              <table class="table js-transcoding-jobs-container" style="display:none">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Status</th>
                    <th>File</th>
                  </tr>
                </thead>
                <tbody class="js-transcoding-jobs">

                </tbody>
              </table>

          </div>
          <div class="panel-footer">
            <button aria-hidden="true" data-dismiss="modal" class="pull-right btn btn-default mr5" type="button">Done</button>
            <button aria-hidden="true" class="pull-right btn btn-primary mr5 js-transcode" type="button" disabled>Transcode</button>
          </div>

      </div>
    </div>
  </div>
</div> <!-- /.modal-channel-video-new -->

.
